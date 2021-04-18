import React from 'react';
import {IonRow, IonCol, IonCard, IonCardContent} from '@ionic/react';



const BmiResults: React.FC<{result:number| string}>=props=>{

    return (

        <IonRow>
            <IonCol>
                <IonCard>
                    <IonCardContent>
                        <h2>Your BMI is: {props.result}</h2>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>

    );

};

export default BmiResults;
