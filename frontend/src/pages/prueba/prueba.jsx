import React, { useState } from "react";
import axios from 'axios'
const Prueba = () => {
  const [image, setImage] = useState(null);

  const onSubmit = async (e) => {
		
    const form = new FormData();
    form.append("image", image);

		const response = await axios.put(`https://c12-29-ft-node-react.onrender.com/api/lawyers/image/64b8142292e71c6cc5c0ec7e`, form, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		});

    console.log(response);
  };
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input
          type="file"
          accept=".png,.jpeg,.jpg"
          name="file"
          onChange={(e) => {
            setImage(e?.target?.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <button type="submit">enviar</button>
      </form>
    </div>
  );
};

export default Prueba;
