import { LinkBox, LinkOverlay, ListIcon, ListItem } from '@chakra-ui/layout'
import Link from 'next/link'
import { IconType } from 'react-icons'

type Item = {
  name: string
  icon: IconType
  route: string
}
type Props = {
  item: Item
}
const MenuItem = ({ item }: Props) => {
  return (
    <ListItem paddingX="20px" fontSize="16px" key={item.name}>
      <LinkBox>
        <Link href={item.route} passHref>
          <LinkOverlay>
            <ListIcon as={item.icon} color="white" marginRight="20px" />
            {item.name}
          </LinkOverlay>
        </Link>
      </LinkBox>
    </ListItem>
  )
}
export default MenuItem
