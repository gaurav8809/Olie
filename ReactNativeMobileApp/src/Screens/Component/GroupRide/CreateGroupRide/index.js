import React, {useEffect, useState} from 'react';
import {View, Modal} from 'react-native';
import {AddParticipants} from './addParticipantsToGroupRide';
import {NewGroupRide} from './newGroupRide';

export const CreateGroupRide = ({navigation, onClose, activeTab}) => {
  const [participants, selectParticipants] = useState([]);
  const [isAddParticipants, toggleAddParticipants] = useState(true);

  return (
    <Modal style={{flex: 1}}>
      {isAddParticipants ? (
        <AddParticipants
          participants={participants}
          rightComponentName={'Next'}
          onNext={(data) => {
            selectParticipants([...data]);
            toggleAddParticipants(false);
          }}
          onCancel={(data) => {
            console.log(data);
            onClose();
          }}
        />
      ) : (
        <NewGroupRide
          navigation={navigation}
          participants={participants}
          onCancel={() => {
            toggleAddParticipants(true);
          }}
        />
      )}
    </Modal>
  );
};
