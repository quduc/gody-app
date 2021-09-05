import React, { Component, FC, ReactNode } from 'react';

import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';


interface Props { }
const PrivacySettings: FC<Props> = () => {
   return (
      <CustomBackground>

         <CustomButton
            rightIcon={require('../../resources/images/forward.png')}
            type="light"
            title="Location Preferences"
         />

         <CustomButton
            rightIcon={require('../../resources/images/forward.png')}
            type="light"
            title="Notifications"
         />

         <CustomButton
            rightIcon={require('../../resources/images/forward.png')}
            type="light"
            title="911-data sharing"
         />

         <CustomButton
            leftIcon={require('../../resources/images/delete.png')}
            rightIcon={require('../../resources/images/forward.png')}
            type="primary"
            title="Delete your account"
         />
      </CustomBackground>
   )
}

export default PrivacySettings
