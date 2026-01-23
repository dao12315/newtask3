import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";


type AppButtonProps = {
    icon?: IconSource;
    onPress?: () => void;
    type?: 'primary' | 'dafault' ;
    label?: string;
    align?: 'left' | 'center' | 'right' ;
    title?: string;
};

const AppButton: React.FC<AppButtonProps> = ({
    onPress,
    icon,
    title
}) => {
    const styles= StyleSheet.create({
        
    })

    return (
        <Button
        onPress={onPress}
        icon={icon}
        >
        {title}
        </Button>
    )
}

export default AppButton;