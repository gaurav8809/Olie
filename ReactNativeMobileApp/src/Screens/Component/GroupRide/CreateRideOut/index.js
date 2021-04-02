import React, {useEffect, useState} from 'react';
import {View, Modal} from 'react-native';
import {ActionSheet} from '../../../Common';
import {hp} from '../../../../Helper/themeHelper';
import {createRideoutActionSheet} from './data';
import {NewRideOut} from './newRideOut';
import {NewSponseredRideOut} from './newSponseredRideOut';
import {AddParticipants} from './addParticipants';

export const CreateRideOut = ({navigation, onCancelAction, activeTab}) => {
  const [actionSheet, setActionSheet] = useState(true);
  const [isAddParticipants, toggleAddParticipants] = useState(false);
  const [selectionType, changeSelectionType] = useState(0);
  const [participants, selectParticipants] = useState([]);

  const closeActionSheet = () => setActionSheet(false);

  useEffect(() => {
    setActionSheet(true);
    toggleAddParticipants(false);
    changeSelectionType(0);
  }, [activeTab]);

  const selectRideType = (type) => {
    closeActionSheet();
    changeSelectionType(type);
    toggleAddParticipants(true);
  };

  return (
    <Modal style={{flex: 1}}>
      {selectionType === 0 ? (
        <NewSponseredRideOut
          onCancel={(data) => {
            setActionSheet(true);
            toggleAddParticipants(false);
          }}
        />
      ) : isAddParticipants ? (
        <AddParticipants
          participants={participants}
          rightComponentName={'Add'}
          onNext={(data) => {
            selectParticipants([...data]);
            toggleAddParticipants(false);
          }}
          onCancel={(data) => {
            setActionSheet(true);
            selectParticipants([]);
            toggleAddParticipants(false);
          }}
        />
      ) : (
        <NewRideOut
          participants={participants}
          onCancel={() => {
            toggleAddParticipants(true);
          }}
        />
      )}

      <ActionSheet
        containerStyle={{paddingBottom: hp(0)}}
        data={createRideoutActionSheet(selectRideType)}
        rowStyle={{justifyContent: 'flex-start'}}
        visible={actionSheet}
        setActionSheet={() => {
          closeActionSheet();
          onCancelAction();
        }}
      />
    </Modal>
  );
};
