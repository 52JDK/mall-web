module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
        "component",
        {
            "libraryName": "mint-ui",
            "style": true
        }
    ]
]
}
