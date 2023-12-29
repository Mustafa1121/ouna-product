import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { useSelector } from "react-redux";

export default function BasicModal({ open, setOpen, addtoCartHandler, id }) {
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  product.isSmall = true;

  const handleNotVerified = (id) => {
    addtoCartHandler(id);
    setOpen(false);
  };

  const handleVerified = (id, isVerified) => {
    //implement logic to add the additional price in the backend
    //call add to cart handler
    addtoCartHandler(id, isVerified);
    //close Modal
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Verification
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt,
            cum aliquid sit ipsum ratione vero!
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "",
                gap: "10px",
              }}
            >
              <Button onClick={() => handleVerified(id, true)}>
                Verified Item
              </Button>
              <Button onClick={() => handleNotVerified(id)}>
                not Verified
              </Button>
            </Box>
            <Typography fontSize={20}>
              Added Price:{" "}
              <span style={{ color: "green" }}>
                {product.isSmall ? "3$" : "7$"}
              </span>
            </Typography>
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
