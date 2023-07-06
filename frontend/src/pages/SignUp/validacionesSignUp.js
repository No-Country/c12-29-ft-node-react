export const validaciones = {
    name:"^[a-zA-Z ]+$",
    email:"^[^@]+@[^@]+\.[a-zA-Z]{2,}$",
    password:"/^.{4,12}$/",
    telefono:"/^\d{7,14}$"
};

export const nombre = new RegExp("^[a-zA-Z ]+$");
export const email = new RegExp("^[^@]+@[^@]+\.[a-zA-Z]{2,}$");
export const contraseña = new RegExp("/^.{4,12}$/");
export const telefono = new RegExp("/^\d{7,14}$");