import { Mapa3 } from '../../components/ui/Mapa3';
import MenuLateralPoligonosGeograficos from '../../components/ui/MenuLateralPoligonosGeograficos';
import MenuSuperiorPoligonosGeograficos from '../../components/ui/MenuSuperiorPoligonosGeograficos';

const Poligonos = () => {


    return (
        <div className='flex gap-2 items-center justify-center h-full max-h-[80vh] px-2'>
            {/*Contenedor del menu de poligonos*/}
            <div className='w-[20%] h-full max-h-[80vh]'>
                <MenuLateralPoligonosGeograficos />
            </div>
            {/*Contenedor del mapa*/}
            <div className=' h-full w-[80%]'>
                <MenuSuperiorPoligonosGeograficos />
                <Mapa3 />
            </div>
        </div>
    );
};

export default Poligonos;
