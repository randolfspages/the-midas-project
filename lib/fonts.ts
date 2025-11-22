import { IBM_Plex_Serif } from 'next/font/google'

// Create multiple instances for different weights
export const ibmPlexSerifLight = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-ibm-plex-serif-light',
})

export const ibmPlexSerifRegular = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ibm-plex-serif-regular',
})

export const ibmPlexSerifBold = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-ibm-plex-serif-bold',
})