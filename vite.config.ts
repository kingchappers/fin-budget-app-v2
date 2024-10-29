export default defineAppConfig({
    esbuild: {
      supported: {
        'top-level-await': true
      },
    },
  });