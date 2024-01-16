import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';


// Define types for your data if using TypeScript
type Department = {
  id: string;
  name: string;
  checked: boolean;
  subDepartments: SubDepartment[];
};

type SubDepartment = {
  id: string;
  name: string;
  checked: boolean;
};

type DepartmentComponentProps = {
  data: Department[];
};

const DepartmentComponent: React.FC<DepartmentComponentProps> = ({ data }) => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const handleClick = (id: string) => {
    setOpen({ ...open, [id]: !open[id] });
  };



  return (
    <List>
      {data.map((department) => (
        <React.Fragment key={department.id}>
          <ListItem button onClick={() => handleClick(department.id)}>
            <Checkbox
              edge="start"
              checked={department.checked}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${department.id}` }}
            
            />
            <ListItemText primary={department.name} />
            {open[department.id] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[department.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDept) => (
                <ListItem key={subDept.id} button>
                  <Checkbox
                    edge="start"
                    checked={subDept.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': `checkbox-list-label-${subDept.id}` }}
                    
                  />
                  <ListItemText primary={subDept.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentComponent;

