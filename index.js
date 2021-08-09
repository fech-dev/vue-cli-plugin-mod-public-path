
module.exports = (api) => {

	const buildFilenameTemplate = (ext) => `[name]-[hash:8].${ext}`
  
  // if(process.env.NODE_ENV === "production"){
  //  api.configureWebpack({
	// 	 output: {
	//      publicPath: 'https://example.com/cdn'
	// 	 }
  //  })
  // }

	api.chainWebpack(config => {
		config
			.output
			.filename(buildFilenameTemplate("js"))
			.chunkFilename(buildFilenameTemplate("js"))
        
		config.devtool("source-map")

		//production only
		if(process.env.NODE_ENV === "production"){

      //1. Doesn't work => Configuration Error: Avoid modifying webpack output.publicPath directly. Use the "publicPath" option instead.
      config.output.publicPath('https://example.com/cdn') 
      
      //2. see line 7-9 , modifing publicPath in configureWebpack
      
      //3. modify publicPath on the Service instance => it throws the same error as point 1
      // api.service.projectOptions.publicPath = 'https://example.com/cdn'

			config.devtool(false)
			
		}
	})
}
