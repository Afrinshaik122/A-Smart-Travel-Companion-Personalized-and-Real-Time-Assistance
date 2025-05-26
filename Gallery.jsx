import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "../pages css/Gallery.module.css";

const modules = [
  {
    title: "Local Attractions",
    description: "Discover local landmarks, tourist spots, and hidden gems in the area.",
    images: [
      "https://offloadmedia.feverup.com/secretchicago.com/wp-content/uploads/2021/01/19043815/Chicago-Bean-scaled.jpg",
      "https://assets.architecturaldigest.in/photos/600847cd94ca758bb0ad1846/master/w_1600%2Cc_limit/BRIHADESHWARA-TEMPLE-Jean-Pierre-Dalbera-temples-4.jpg",
      "https://www.cumberlandcrossingrc.com/wp-content/uploads/2020/06/kennebunkport-4015503_1920.jpg",
      "https://www.frenchplanations.com/wp-content/uploads/2018/06/architecture-buildings-city-739407.jpg",
      "https://tse4.mm.bing.net/th?id=OIP.QSKwv2sMNrg6bGJMnnd82wHaFj&pid=Api&P=0&w=300&h=300",
      "https://www.earthsattractions.com/wp-content/uploads/2018/08/sydney_opera-unsplash.jpg",
      "https://loveincorporated.blob.core.windows.net/contentimages/fullsize/eb6a046a-ddca-4df1-ab53-4674897d6137-river-tay-perth-scotland-uk.jpg",
      "https://tse3.mm.bing.net/th?id=OIP.wHGr9CQUk4am_ud0pP6iOQHaFI&pid=Api&P=0&h=180",
      "https://www.templebarhotel.com/wp-content/uploads/2022/09/Things-to-do_Local-attractions2-1366x768-fp_mm-fpoff_0_0.jpeg",
      "https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/v1620250350/10-Best-Attractions-Thailand-Grand-Palace/10-Best-Attractions-Thailand-Grand-Palace.jpg",
      "https://tse4.mm.bing.net/th?id=OIP.jGTnp3XfPzEVrHWuJ1uNDwHaEQ&pid=Api&P=0&h=180",
      "https://tse2.mm.bing.net/th?id=OIP.4YCjGEbUaAtUf-xrpqstvwHaFB&pid=Api&P=0&w=300&h=300",
    ]
  },
  {
    title: "Restaurants",
    description: "Find the best-rated food joints and hidden culinary treasures.",
    images: [
      "https://tse3.mm.bing.net/th?id=OIP.JvZ3iZy5BoMVODEcrFJQTgHaEo&pid=Api&P=0&h=180",
      "https://www.abasturhub.com/img/blog/mejores-restaurantes---diseno-sin-titulo.jpg",
      "https://vistapointe.net/images/restaurant-3.jpg",
      "https://tse4.mm.bing.net/th?id=OIP.Q6xjQs5ipwruaRlMTSoBbgHaEK&pid=Api&P=0&h=180",
      "https://png.pngtree.com/background/20230527/original/pngtree-lighting-of-cafe-table-and-chairs-picture-image_2760365.jpg",
      "https://tse3.mm.bing.net/th?id=OIP.5HQw_lnuOKKVg5hnxgXe4QHaEM&pid=Api&P=0&h=180",
      "https://www.asia-bars.com/wp-content/uploads/2016/02/aura-21.jpg",
      "https://tse1.mm.bing.net/th?id=OIP.MlQONdlErjMvoibI6rC-3gHaEJ&pid=Api&P=0&h=180",
      "https://tse4.mm.bing.net/th?id=OIP.aIlFLLIIWu2useNML3MUkQHaEd&pid=Api&P=0&h=180",
      "https://www.omegaon27.com/gallery/images/gallery08.jpg",
      "https://tse3.mm.bing.net/th?id=OIP.l_p5KR1XyHUf7wLYyrzieAHaEK&pid=Api&P=0&h=180",
      "https://digital.ihg.com/is/image/ihg/kimpton-new-orleans-8628477817-2x1"
    ]
  },
  {
    title: "Health Facilities",
    description: "Quickly locate nearby hospitals, clinics, and pharmacies during emergencies.",
    images: [
      "https://tse2.mm.bing.net/th?id=OIP.5yAP0gwLaeE_FUangW3p6AHaF7&pid=Api&P=0&h=180",
      "https://www.cleanlink.com/resources/editorial/2022/29145-healthcare-sstock-1339361810.jpg",
      "https://tse2.mm.bing.net/th?id=OIP.BY2GSYzC0uABdx01C620mAHaCx&pid=Api&P=0&w=300&h=300",
      "https://epsa-online.org/LLeaP/wp-content/uploads/2019/04/access_banner.png",
      "https://wallpaperaccess.com/full/136949.jpg",
      "http://im.hunt.in/cg/Chennai/City-Guide/emergency-chennai3.jpg",
      "https://www.winmate-rugged.com/upload/Product/L2/Product-Healthcare_Tablets-en-US-L2-I.jpg",
      "https://tse2.mm.bing.net/th?id=OIP.0ENlQnYPfDwx7GLG2I7wFwHaE8&pid=Api&P=0&h=180",
      "https://tse3.mm.bing.net/th?id=OIP.muZ-X5ycH6mr9LBVqFBxqwHaEo&pid=Api&P=0&w=300&h=300",
      "https://todayseniorliving.com/wp-content/uploads/2022/02/invest-in-your-health-healthy-lifestyle-concept-with-diet-and-fitness-get-fit-in-fitness-equipment-and-healthy-food-158227197-2048x1365.jpg",
      "https://wallpaperaccess.com/full/136934.jpg",
      "https://tse1.mm.bing.net/th?id=OIP.0q0QZVZT412sPFjQJ35ajQHaGc&pid=Api&P=0&h=180"
    ]
  },
  {
    title: "Live Local Events",
    description: "Join live events, concerts, and cultural festivals happening around you.",
    images: [
      "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-2747449.jpg&fm=jpg",
      "https://tse1.mm.bing.net/th?id=OIP.Ex97I3uaWav54E-dB5F5BQHaE9&pid=Api&P=0&h=180",
      "https://static.toiimg.com/photo/msid-80334120,width-96,height-65.cms",
      "https://philippinetourismusa.com/wp-content/uploads/2019/05/Sinulog-by-Robo-G.-Formacion-1200x857-1200x857.jpg",
      "https://tse3.mm.bing.net/th?id=OIP.uoPbBSz8YFLw52nzSzUwcgHaE7&pid=Api&P=0&h=180",
      "https://tse4.mm.bing.net/th?id=OIP.q9T_SOvqYJuZmPKsWNQnEgHaE8&pid=Api&P=0&w=300&h=300",
      "https://thebrownandwhite.com/wp-content/uploads/2022/10/221019ARTMARKET_3.jpg",
      "https://www.redsquaremedia.com.au/wp-content/uploads/2014/06/Live-event-photography-gallery.jpg",
      "https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/09/Festival-in-Chiang-Mai-Thailand-1200x853.jpg",
      "https://bloximages.newyork1.vip.townnews.com/carrollspaper.com/content/tncms/assets/v3/editorial/b/4e/b4e52960-276e-11ef-a942-4f3d27298271/66676d2ea249c.image.jpg?resize=960%2C500",
      "https://tripjive.com/wp-content/uploads/2025/04/Flamands-cultural-events-1024x585.jpg",
      "https://asiasomeday.com/philippine/wp-content/uploads/sites/7/2020/04/dinagyang-festival-ililo.jpg",
    ]
  }
];

const Gallery = () => {
  return (
    <div className={styles.fullScreenSwiper}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        modules={[Navigation]}
      >
        {modules.map((module, index) => (
          <SwiperSlide key={index}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{module.title}</h2>
              <p className={styles.cardDescription}>{module.description}</p>
              <div className={styles.imageGrid}>
                {module.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`img-${idx}`} />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
