export const config = (layout, spacing) => ({
  shape: {
    dimension: {
      // Set maximum dimensions
      maxWidth: 500,
      maxHeight: 500,
    },
    spacing: {
      padding: spacing,
    },

    // dest: `${layout}/intermediate-svg`, // Keep the intermediate files
  },
  mode: {
    view: {
      // Activate the «view» mode
      bust: false,
      render: {
        scss: true, // Activate Sass output (with default options)
      },
      layout: layout,
      // example: true,
    },

    symbol: true, // Activate the «symbol» mode
  },
})
