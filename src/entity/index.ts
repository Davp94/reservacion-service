import { Empresa } from "./empresa.entity";
import { Horario } from "./horario.entity";
import { Reservacion } from "./reservacion.entity";
import { Rol } from "./rol.entity";
import { Usuario } from "./usuario.entity";

const entities = [
    Rol,
    Usuario,
    Empresa,
    Horario,
    Reservacion,
]

export { entities }