import "../styles/Slide.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const Slide = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/properties/search/${search}`);
    }
  };

  return (
    <div className="slide">
      <h1>
        KK Agency <br />
        รวมที่พักให้เช่าในขอนแก่น

        <div className="slide_search">
          <input
            maxLength={40}
            type="text"
            placeholder="ค้นหาง่าย..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton disabled={search === ""}>
            <Search
              sx={{ color: "#FFF" }}
              onClick={() => { navigate(`/properties/search/${search}`) }}
            />
          </IconButton>
        </div>
      </h1>
    </div>
  );
};

export default Slide;
