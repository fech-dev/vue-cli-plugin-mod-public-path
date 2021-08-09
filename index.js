const ZipWebpackPlugin = require("zip-webpack-plugin")

module.exports = (api) => {

	const buildFilenameTemplate = (ext) => `[name]-[hash:8].${ext}`
  
  if(process.env.NODE_ENV === "production"){
   api.configureWebpack({
     publicPath: 'https://example.com/cdn'
   })
  }

	api.chainWebpack(config => {
		config
			.output
			.filename(buildFilenameTemplate("js"))
			.chunkFilename(buildFilenameTemplate("js"))
        
		config.devtool("source-map")

		//production only
		if(process.env.NODE_ENV === "production"){

      //1. Doesn't work => 
      config.output.publicPath('https://example.com/cdn') 
      
      //2. see line , modifing publicPath in configureWebpack
      
      //3. modify publicPath on the Service instance => it throws the same error as point 1
      api.service.projectOptions.publicPath = 'https://example.com/cdn'

			config.devtool(false)
			
			config
				.plugin("zip-plugin")
				.use(ZipWebpackPlugin, [
					{
						filename: "dist.zip",
						exclude: [/\.html$/],
						pathPrefix: landingConfig.name
					}
				])   
		}
	})
}
