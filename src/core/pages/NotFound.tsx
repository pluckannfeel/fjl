import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
// import image from './image.svg';
import image from "../../core/assets/notfound.svg";
import classes from "../classes/NotFound.module.scss";
import { useNavigate } from "react-router";
import { useAuth } from "@/auth/contexts/AuthProvider";
import { useApplicantAuth } from "@/mirairo/contexts/ApplicantAuthProvider";

const NotFound = () => {
  let navigate = useNavigate();
  const { adminInfo } = useAuth();
  const { applicantInfo } = useApplicantAuth();

  const handleClick = () => {
    // check if there is authkey in localstorage
    // if there is, navigate to the dashboard
    // else navigate to the landing page
    if (adminInfo && applicantInfo) {
      navigate("/");
    } else if (adminInfo) {
      navigate("/admin");
    } else if (applicantInfo) {
      navigate("/applicant-dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            // variant="outline"
            variant="gradient"
            gradient={{ from: "pink", to: "red" }}
            size="md"
            mt="xl"
            onClick={handleClick}
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
