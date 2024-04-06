import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  breakpoints: {
    sm: '20em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '1xl': '1442px', // 1536px
    '2xl': '96em', // 1536px
  },
  styles: {
    global: {
      body: {
        bg: '#000',
        color: '#fff',
      },
      a: {
        color: '#fff',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },

  components: {
    Heading: {
      variants: {
        h1: {
          fontWeight: 700,
          fontSize: '28px',
          lineHeight: ' 129%',
          letterSpacing: '-0.02em',
          color: '#fff',
        },
      },
    },
    Text: {
      sizes: {
        xxl: {
          fontWeight: 500,
          fontSize: '45px',
        },
        xl: {
          fontWeight: 400,
          fontSize: '35px',
        },
        lg: {
          fontWeight: 300,
          fontSize: '25px',
        },
        md: {
          fontWeight: 200,
          fontSize: '15px',
        },
      },
      variants: {
        title: {
          fontWeight: 500,
          fontSize: '45px',
          lineHeight: ' 105%',
          letterSpacing: '-0.03em',
          color: '#fff',
        },
        subTitle: {
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: ' 150%',
          color: '#9a9b9b',
        },
        smallText: {
          fontWeight: 600,
          fontSize: '11px',
          letterSpacing: '0.04em',
          color: '#96bfae',
        },
        semiText: {
          fontWeight: 500,
          fontSize: '14px',
          letterSpacing: '143%',
          color: '#fff',
        },
      },
    },
    Button: {
      variants: {
        main: {
          bg: '#96bfae',
          p: '12px 25px',
          textAlign: 'center',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: ' 112%',
          color: '#101e1b',
          transition: 'all .3s',
          _hover: {
            opacity: '0.7',
          },
          _disabled: {
            opacity: '0.2',
          },
        },
      },
    },
  },
});
