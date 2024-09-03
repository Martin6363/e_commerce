import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import BreadcrumbsCont from '@mui/material/Breadcrumbs';

export default function Breadcrumbs({ category, brand }) {
    const navigate = useNavigate();

    function handleBackClick () {
        navigate(-1);
    }
    
  return (
    <div className="breadcrumbs my-3 flex items-center gap-3">
      <IconButton onClick={handleBackClick} title="to back">
          <FaArrowLeft />
      </IconButton>
      <BreadcrumbsCont aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to={"/"}>
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          to={"/material-ui/getting-started/installation/"}
        >
          {category}
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          to={"/material-ui/react-breadcrumbs/"}
          aria-current="page"
        >
          {brand}
        </Link>
      </BreadcrumbsCont>
    </div>
  );
}
