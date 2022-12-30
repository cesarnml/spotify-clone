import { Box } from '@chakra-ui/layout'
import Image from 'next/image'

const SidebarLogo = () => {
  return (
    <Box width="120px" marginBottom="20px" paddingX="20px">
      <Image src="/logo.svg" height={60} width={120} alt="logo" />
    </Box>
  )
}
export default SidebarLogo
