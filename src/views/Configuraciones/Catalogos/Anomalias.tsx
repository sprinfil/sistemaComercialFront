import AnomaliaForm from '../../../components/Forms/AnomaliaForm.tsx';
import AnomaliaTable from '../../../components/Tables/Components/AnomaliaTable.tsx';
import { ContextProvider } from '../../../contexts/ContextAnomalias.tsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DoubleContainer, Seccion1, Seccion2 } from '../../../components/ui/DoubleContainer.tsx';

export default function Anomalias() {

  return (
    <ContextProvider>
      <DoubleContainer>
        <Seccion1>
          <AnomaliaTable />
        </Seccion1>
        <Seccion2>
          <AnomaliaForm />
        </Seccion2>
      </DoubleContainer>
    </ContextProvider>
  );
}