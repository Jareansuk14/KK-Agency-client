import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";

import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
    area: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId = useSelector((state) => state.user._id);

  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("area", formLocation.area);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      /* Send a POST request to server */
      const response = await fetch("https://kkagency-api.onrender.com/properties/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };
  return (
    <>
      <Navbar />

      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>ขั้นตอนที่ 1: เกี่ยวกับสถานที่พักของคุณ</h2>
            <hr />
            <h3>โซนไหนต่อไปนี้ตรงกับสถานที่พักของคุณมากที่สุด?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${category === item.label ? "selected" : ""
                    }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
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
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
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
                <p>ถนน</p>
                <input
                  type="text"
                  placeholder="ถนน"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
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
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>ตำบล</p>
                <input
                  type="text"
                  placeholder="ตำบล"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
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
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>จังหวัด</p>
                <input
                  type="text"
                  placeholder="จังหวัด"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
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
                      guestCount > 0 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
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
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
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
                <p>เตียง</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 0 && setBedCount(bedCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
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
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
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

            <div className="area">
              <h3>พื้นที่ใช้สอย (ตร.ม.)</h3>
              <input
                type="number"
                placeholder="พื้นที่ใช้สอย (ตร.ม.)"
                name="area"
                value={formLocation.area}
                onChange={handleChangeLocation}
                className="area"
                required
              />
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>ขั้นตอนที่ 2: สิ่งอำนวยความสะดวก</h2>
            <hr />

            <h3>สิ่งอำนวยความสะดวกที่คุณจัดเตรียมไว้ให้</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${amenities.includes(item.name) ? "selected" : ""
                    }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>เพิ่มรูปภาพสถานที่พักของคุณ</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>อัพโหลดจากอุปกรณ์ของคุณ</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>อัพโหลดจากอุปกรณ์ของคุณ</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>เพิ่มรายละเอียดให้กับที่พักของคุณ</h3>
            <div className="description">
              <p>หัวข้อ</p>
              <input
                type="text"
                placeholder="หัวข้อ"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>รายละเอียด</p>
              <textarea
                type="text"
                placeholder="รายละเอียด"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
              <p>ไฮไลท์</p>
              <input
                type="text"
                placeholder="ไฮไลท์"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />
              <p>ค่าประกันและค่าเช่าล่วงหน้า</p>
              <textarea
                type="text"
                placeholder="ค่าประกันและค่าเช่าล่วงหน้า"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              />
              <p>ตั้งราคาให้กับที่พักของคุณ</p>
              <span>฿</span>
              <input
                type="text"
                placeholder="100"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              />
            </div>
          </div>

          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateListing;
