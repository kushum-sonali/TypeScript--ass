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
  const [departments, setDepartments] = useState<Department[]>(data);
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const handleClick = (id: string) => {
    setOpen({ ...open, [id]: !open[id] });
  };

  const handleCheck = (id: string, isSubDept: boolean, parentId?: string) => {
    setDepartments(prevDepartments =>
      prevDepartments.map(dept => {
        if (isSubDept && dept.id === parentId) {
          // Handle sub-department check
          const newSubDepts = dept.subDepartments.map(subDept =>
            subDept.id === id ? { ...subDept, checked: !subDept.checked } : subDept
          );
          const allChecked = newSubDepts.every(subDept => subDept.checked);
          return { ...dept, checked: allChecked, subDepartments: newSubDepts };
        } else if (!isSubDept && dept.id === id) {
          // Handle department check
          const newChecked = !dept.checked;
          const newSubDepts = dept.subDepartments.map(subDept => ({ ...subDept, checked: newChecked }));
          return { ...dept, checked: newChecked, subDepartments: newSubDepts };
        }
        return dept;
      })
    );
  };

  return (
    <List>
      {departments.map((department) => (
        <React.Fragment key={department.id}>
          <ListItem button onClick={() => handleClick(department.id)}>
            <Checkbox
              edge="start"
              checked={department.checked}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${department.id}` }}
              onChange={() => handleCheck(department.id, false)}
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
                    onChange={() => handleCheck(subDept.id, true, department.id)}
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


