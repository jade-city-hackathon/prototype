import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

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
        bg: mode('gray.100', 'gray.600'),
        color: mode('#828BA066', 'gray.800'),
      },
      // styles for the `a`
      a: {
        color: 'teal.500',
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
        },
      },
    },
  },
});
