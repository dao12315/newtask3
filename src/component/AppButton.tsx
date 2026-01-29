import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

type AppButtonProps = {
  title: string;
  onPress?: () => void;

  icon?: IconSource;
  loading?: boolean;
  disabled?: boolean;

  type?: 'primary' | 'default';
  align?: 'left' | 'center' | 'right';
};

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  icon,
  loading = false,
  disabled = false,
  type = 'default',
  align = 'center',
}) => {
  return (
    <View style={[styles.wrapper, alignStyles[align]]}>
      <Button
        mode="contained"
        icon={icon}
        onPress={onPress}
        loading={loading}
        disabled={disabled || loading}
        contentStyle={styles.content}
        labelStyle={[styles.label, type === 'primary' && styles.primaryLabel]}
        buttonColor={type === 'primary' ? '#990012' : '#E0E0E0'}
        textColor={type === 'primary' ? '#FFFFFF' : '#000000'}
      >
        {title}
      </Button>
    </View>
  );
};

export default AppButton;
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  content: {
    height: 50,
    paddingHorizontal: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
  },

  primaryLabel: {
    fontWeight: '600',
  },
});

const alignStyles = StyleSheet.create({
  left: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
});
