import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {CategoryKeys} from './categories/data';
import CategoryListItem from './categories';

export interface MainListProps {
  refreshing: boolean;
  onRefresh: () => void;
}

export default function MainList(props: MainListProps) {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }>
      {CategoryKeys.map((category, index) => (
        <CategoryListItem key={category} index={index} category={category} />
      ))}
    </ScrollView>
  );
}
