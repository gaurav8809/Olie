import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ActionSheet} from '../../../Common';
import {hp} from '../../../../Helper/themeHelper';
import {createGroupsActionSheet} from './data';
import {NewGroupRide} from './newGroupRide';
import {NewRideOut} from './newRideOut';
import {AddParticipants} from './addParticipants';

export const CreateGroups = ({navigation, onCancelAction, activeTab}) => {
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
    <View style={{flex: 1}}>
      {isAddParticipants ? (
        <AddParticipants
          participants={participants}
          rightComponentName={'Next'}
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
      ) : selectionType === 0 ? (
        <NewGroupRide
          navigation={navigation}
          participants={participants}
          onCancel={() => {
            toggleAddParticipants(true);
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
        data={createGroupsActionSheet(selectRideType)}
        rowStyle={{justifyContent: 'flex-start'}}
        visible={actionSheet}
        setActionSheet={() => {
          closeActionSheet();
          onCancelAction();
        }}
      />
    </View>
  );
};
