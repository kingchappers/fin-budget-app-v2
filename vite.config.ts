export default defineAppConfig({
    esbuild: {
      supported: {
        'top-level-await': true //browsers can handle top-level-await features
      },
    }
  })