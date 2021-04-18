import { 
  IonApp, 
  IonContent,
   IonHeader,
   IonToolbar,
   IonTitle,
   IonLabel,
   IonGrid,
   IonRow,
   IonCol,
   IonInput,
   IonItem,
   IonAlert,
  
  } from '@ionic/react';
import React , {useRef, useState} from 'react';
import Home from './pages/Home';


/*Custom Componenets */
import BmiControls from './components/bmiControls'
import BmiResults from './components/bmiResults'
import InputControls from './components/inputControls'
/**/

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [calculateBmi,setcalcuateBmi]=useState<number>();
  const [error,seterror]=useState<string>();
  const [calcUnits,setCalcUnits]=useState<'mkg'|'ftlbs'>('mkg');
  
  const weightInputRef=useRef<HTMLIonInputElement>(null);
  const heightInputRef=useRef<HTMLIonInputElement>(null);

  const calculateBMI=()=>{
    const enterWeight=weightInputRef.current!.value;
    const enterHeight = heightInputRef.current!.value;

    if(!enterWeight || !enterHeight || +enterWeight <=0 || +enterHeight<=0 ){
      seterror('Pleae enter valid (non-neagtive) input value');
      return;
    }


    const weightConversionFactor=calcUnits=='ftlbs'?2.2:1;
    const heightConversionFactor = calcUnits == 'ftlbs' ? 3.28 : 1;

    const weight =+enterWeight/weightConversionFactor;
    const height = +enterHeight / heightConversionFactor;
    const bmi=weight/(height*height);
    //console.log(bmi)
    setcalcuateBmi(bmi);

  }
  const resetInput=()=>{

    weightInputRef.current!.value="";
    heightInputRef.current!.value="";
  }
  const clearError=()=>{
    seterror('');
  };

  const selectedUnitHandler=(selectedValue:'mkg' | 'ftlbs')=>{
      setCalcUnits(selectedValue);
  };

  return (
  <React.Fragment>
    <IonAlert isOpen={!!error}
    message={error}
    buttons={[{text:'Okay',handler:clearError}]}
    />
  <IonApp>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
          <IonCol>
            <InputControls selectedValue={calcUnits} onSelectedValue={selectedUnitHandler}/>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Your Height ({calcUnits=='mkg'?'meters':'feet'})</IonLabel>
              <IonInput type="number" ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
                  <IonLabel position="floating">Your Weight ({calcUnits == 'mkg' ? 'kg' : 'lbs'})</IonLabel>
              <IonInput type="number" ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <BmiControls onCalculate={calculateBMI} onReset={resetInput}/>

        {calculateBmi && (
            <BmiResults result={calculateBmi}/>
        )}
      </IonGrid>
    </IonContent>
  </IonApp>
  </React.Fragment>
  );
};

export default App;
