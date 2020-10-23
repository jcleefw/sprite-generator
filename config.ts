export const config = {
  shape: {
    dimension: {
      // Set maximum dimensions
      maxWidth: 64,
      maxHeight: 64,
    },
    spacing: {
      padding: [0, 16, 32, 16],
    },
    dest: 'out/intermediate-svg', // Keep the intermediate files
  },
  mode: {
    view: {
      // Activate the «view» mode
      bust: false,
      render: {
        scss: true, // Activate Sass output (with default options)
      },
    },
    symbol: true, // Activate the «symbol» mode
  },
}
