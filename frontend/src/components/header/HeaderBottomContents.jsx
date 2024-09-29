import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import CategoryIcon from "@mui/icons-material/Category";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  width: "100%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  color: theme.palette.mode === "dark" ? "#f2f2f2" : "#000",
  ...theme.applyStyles("dark", {
    backgroundColor: "#33006F",
  }),
}));

function HeaderBottomContents() {
  return (
    <div className="my-5">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          padding: "3px 10px",
        }}
      >
        <Item>
          <Link to={"/promotions"} className="flex items-center justify-center gap-2 w-full h-full leading-[45px]">
            <LoyaltyIcon /> Promotions
          </Link>
        </Item>
        <Item>
            <Link to={'/categories'} className="flex items-center justify-center gap-2 w-full h-full leading-[45px]">
                <CategoryIcon /> Categories
            </Link>
        </Item>
      </Stack>
    </div>
  );
}

export default HeaderBottomContents;
