import { Button, ButtonGroup } from "@blueprintjs/core";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { ScreenLocalContextProvider } from "../context/ScreenLocalContext";
import { createStyleMap } from "../utils";

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentScreenSelected = (route: ROUTES, selectedScreen: string) => {
    return selectedScreen.includes(route);
  };

  const styles = createStyleMap({
    container: {
      display: "flex",
      height: "100vh",
      // TODO - Fix max-width when overflowing on the horizontal axis
      // maxWidth: "100vw"
    },
    sideBar: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      padding: "0.5rem",
    },
    menuButtonsContainer: {
      height: "max-content",
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      height: "60px",
      backgroundColor: "red",
      color: "white",
    },
    content: {
      width: "100%",
      padding: "0.5rem",
    },
  });

  return (
    <div style={styles.container}>
      <div style={styles.sideBar}>
        <div style={styles.logoContainer}>LOGO</div>

        <div style={styles.menuButtonsContainer}>
          <ButtonGroup vertical fill large>
            <Button
              icon="person"
              intent={
                isCurrentScreenSelected(ROUTES.CLIENTS, location.pathname)
                  ? "primary"
                  : "none"
              }
              onClick={() => {
                navigate(ROUTES.CLIENTS);
              }}
            >
              Clientes
            </Button>

            <Button
              icon="annotation"
              onClick={() => {
                navigate(ROUTES.HOME);
              }}
            >
              Pedidos
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div style={styles.content}>
        <ScreenLocalContextProvider>
          <Outlet />
        </ScreenLocalContextProvider>
      </div>
    </div>
  );
};
