import React from 'react';
import { FormHelperText } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SelectField(props) {
    const { data, error, value, onChange, name, className, label, ...rest } = props;

    return (
        <FormControl fullWidth error={!!error} className={className}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
            >
                <MenuItem value=''>
                    <em>Selecione</em>
                </MenuItem>
                {
                    data.map((item, index) => {
                        return (
                            <MenuItem
                                key={index}
                                value={item.idServico}
                            >
                                {item.nomeServico}
                            </MenuItem>
                        );
                    })
                }
            </Select>
            {!!error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}