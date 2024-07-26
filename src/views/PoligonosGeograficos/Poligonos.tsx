import { Mapa3 } from '../../components/ui/Mapa3';
import MenuLateralPoligonosGeograficos from '../../components/ui/MenuLateralPoligonosGeograficos';
import MenuSuperiorPoligonosGeograficos from '../../components/ui/MenuSuperiorPoligonosGeograficos';
import { ContextProvider } from '../../contexts/ContextPoligonos';
const Poligonos = () => {


    return (
        <>
            <ContextProvider>
                <div className='flex gap-2 items-center justify-center h-full max-h-[80vh] px-2'>
                    {/*Contenedor del menu de poligonos*/}
                    <div className='w-[22%] h-full max-h-[80vh]'>
                        <MenuLateralPoligonosGeograficos />
                    </div>
                    {/*Contenedor del mapa*/}
                    <div className=' h-full w-[78%]'>
                        <MenuSuperiorPoligonosGeograficos />
                        <Mapa3 />
                    </div>
                </div>
            </ContextProvider>
        </>

    );
};

export default Poligonos;
