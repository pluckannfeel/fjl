import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
// import image from './image.svg';
import image from "../../core/assets/403.svg";
import classes from "../classes/NotFound.module.scss";
import { useNavigate } from "react-router";

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg"></Text>
          <Button
            // variant="outline"
            size="md"
            mt="xl"
            onClick={() => navigate("/mirairo")}
            className={classes.control}
          >
            Go Back
          </Button>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};

export default NotFound;
