import { CloseIcon } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/layout';

export const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      display="flex"
      alignItems="center"
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="pink"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};
