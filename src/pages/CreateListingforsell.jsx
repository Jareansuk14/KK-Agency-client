import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import Cleave from 'cleave.js/react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useReducer } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const initialState = {
  category: "",
  type: "",
  formLocation: {
    location: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
    area: "",
  },
  guestCount: 1,
  bedroomCount: 1,
  bedCount: 1,
  bathroomCount: 1,
  amenities: [],
  photos: [],
  formDescription: {
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    statusroom: "",
    price: "",
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_TYPE':
      return { ...state, type: action.payload };
    case 'SET_LOCATION':
      return {
        ...state,
        formLocation: { ...state.formLocation, [action.payload.name]: action.payload.value }
      };
    case 'SET_GUEST_COUNT':
      return { ...state, guestCount: action.payload };
    case 'SET_BEDROOM_COUNT':
      return { ...state, bedroomCount: action.payload };
    case 'SET_BED_COUNT':
      return { ...state, bedCount: action.payload };
    case 'SET_BATHROOM_COUNT':
      return { ...state, bathroomCount: action.payload };
    case 'SET_AMENITIES':
      return { ...state, amenities: action.payload };
    case 'SET_PHOTOS':
      return { ...state, photos: action.payload };
    case 'SET_DESCRIPTION':
      return {
        ...state,
        formDescription: { ...state.formDescription, [action.payload.name]: action.payload.value }
      };
    default:
      return state;
  }
};

const CreateListingforsell = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const creatorId = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", state.category);
      listingForm.append("type", state.type);

      Object.entries(state.formLocation).forEach(([key, value]) => {
        listingForm.append(key, value);
      });

      Object.entries(state.formDescription).forEach(([key, value]) => {
        listingForm.append(key, value);
      });

      listingForm.append("guestCount", state.guestCount);
      listingForm.append("bedroomCount", state.bedroomCount);
      listingForm.append("bedCount", state.bedCount);
      listingForm.append("bathroomCount", state.bathroomCount);
      listingForm.append("amenities", state.amenities);

      state.photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      const response = await fetch("http://kkagency-api.onrender.com/propertiesforsell/createforsell", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.error("Publish Listing failed", err.message);
      alert("Publishing the listing failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>ลงประกาศขาย</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>ขั้นตอนที่ 1: เกี่ยวกับสถานที่พักของคุณ</h2>
            <hr />
            <h3>โซนไหนต่อไปนี้ตรงกับสถานที่พักของคุณมากที่สุด?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${state.category === item.label ? "selected" : ""}`}
                  key={index}
                  onClick={() => dispatch({ type: 'SET_CATEGORY', payload: item.label })}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>ประเภทที่พักของคุณเป็นแบบไหน?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${state.type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => dispatch({ type: 'SET_TYPE', payload: item.name })}
                >
                  <div className="type_text">
                    <div className="type_icon">{item.icon}</div>
                    <h5>{item.name}</h5>
                  </div>
                </div>
              ))}
            </div>

            <h3>สถานที่พักของคุณอยู่ที่ไหน?</h3>
            <div className="full">
              <div className="location">
                <p>ลิงค์แผนที่</p>
                <input
                  type="text"
                  placeholder="ลิงค์แผนที่"
                  name="location"
                  value={state.formLocation.location}
                  onChange={(e) => dispatch({ type: 'SET_LOCATION', payload: e.target })}
                  required
                />
              </div>
            </div>

            <div className="full">
              <div className="location">
                <p>ถนน</p>
                <input
                  type="text"
                  placeholder="ถนน"
                  name="streetAddress"
                  value={state.formLocation.streetAddress}
                  onChange={(e) => dispatch({ type: 'SET_LOCATION', payload: e.target })}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>ชื่อหมู่บ้าน/ชื่อโครงการ</p>
                <input
                  type="text"
                  placeholder="ชื่อหมู่บ้าน/ชื่อโครงการ"
                  name="aptSuite"
                  value={state.formLocation.aptSuite}
                  onChange={(e) => dispatch({ type: 'SET_LOCATION', payload: e.target })}
                  required
                />
              </div>
              <div className="location">
                <p>ตำบล</p>
                <input
                  type="text"
                  placeholder="ตำบล"
                  name="country"
                  value={state.formLocation.country}
                  onChange={(e) => dispatch({ type: 'SET_LOCATION', payload: e.target })}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>อำเภอ</p>
                <input
                  type="text"
                  placeholder="อำเภอ"
                  name="city"
                  value={state.formLocation.city}
                  onChange={(e) => dispatch({ type: 'SET_LOCATION', payload: e.target })}
                  required
                />
              </div>
              <div className="location">
                <p>จังหวัด</p>
                <input
                  type="text"
                  placeholder="จังหวัด"
                  name="province"
                  value={state.formLocation.province}
                  onChange={(e) => dispatch({ type: 'SET_LOCATION', payload: e.target })}
                  required
                />
              </div>
            </div>

            <h3>ข้อมูลเบื้องต้นเกี่ยวกับสถานที่พักของคุณ</h3>
            <div className="basics">
              <div className="basic">
                <p>ห้องครัว</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      state.guestCount > 0 && dispatch({ type: 'SET_GUEST_COUNT', payload: state.guestCount - 1 });
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                  <p>{state.guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      dispatch({ type: 'SET_GUEST_COUNT', payload: state.guestCount + 1 });
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>ห้องน้ำ</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      state.bathroomCount > 0 && dispatch({ type: 'SET_BATHROOM_COUNT', payload: state.bathroomCount - 1 });
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                  <p>{state.bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      dispatch({ type: 'SET_BATHROOM_COUNT', payload: state.bathroomCount + 1 });
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>ห้องนอน</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      state.bedroomCount > 0 && dispatch({ type: 'SET_BEDROOM_COUNT', payload: state.bedroomCount - 1 });
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                  <p>{state.bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      dispatch({ type: 'SET_BEDROOM_COUNT', payload: state.bedroomCount + 1 });
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>ห้องนั่งเล่น</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      state.bedCount > 0 && dispatch({ type: 'SET_BED_COUNT', payload: state.bedCount - 1 });
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                  <p>{state.bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      dispatch({ type: 'SET_BED_COUNT', payload: state.bedCount + 1 });
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>ขั้นตอนที่ 2: อัปโหลดรูปภาพ</h2>
            <hr />
            <input
              type="file"
              multiple
              onChange={(e) => dispatch({ type: 'SET_PHOTOS', payload: Array.from(e.target.files) })}
              accept="image/*"
              required
            />
          </div>

          <div className="create-listing_step3">
            <h2>ขั้นตอนที่ 3: รายละเอียดเพิ่มเติม</h2>
            <hr />
            <h3>ใส่ชื่อและรายละเอียด</h3>
            <input
              type="text"
              placeholder="ชื่อที่พัก"
              name="title"
              value={state.formDescription.title}
              onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target })}
              required
            />
            <textarea
              placeholder="รายละเอียด"
              name="description"
              value={state.formDescription.description}
              onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target })}
              required
            />
            <h3>ไฮไลต์</h3>
            <input
              type="text"
              placeholder="หัวข้อไฮไลต์"
              name="highlight"
              value={state.formDescription.highlight}
              onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target })}
              required
            />
            <textarea
              placeholder="รายละเอียดไฮไลต์"
              name="highlightDesc"
              value={state.formDescription.highlightDesc}
              onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target })}
              required
            />
            <h3>สถานะห้อง</h3>
            <input
              type="text"
              placeholder="สถานะห้อง"
              name="statusroom"
              value={state.formDescription.statusroom}
              onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target })}
              required
            />
            <h3>ราคา</h3>
            <Cleave
              placeholder="ราคา"
              name="price"
              options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }}
              value={state.formDescription.price}
              onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target })}
              required
            />
          </div>

          <div className="create-listing_step4">
            <h2>ขั้นตอนที่ 4: สิ่งอำนวยความสะดวก</h2>
            <hr />
            <h3>เลือกสิ่งอำนวยความสะดวก</h3>
            <div className="facilities-list">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${state.amenities.includes(item.name) ? "selected" : ""}`}
                  key={index}
                  onClick={() => {
                    const newAmenities = state.amenities.includes(item.name)
                      ? state.amenities.filter((amenity) => amenity !== item.name)
                      : [...state.amenities, item.name];
                    dispatch({ type: 'SET_AMENITIES', payload: newAmenities });
                  }}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <button type="submit">ลงประกาศขาย</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateListingforsell;
