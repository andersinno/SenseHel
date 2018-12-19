import Colors from './Colors';

export const common = {
  color: Colors.darkGrey
};

// Characters

export const headline = {
  ...common,
  fontWeight: 'normal',
  fontSize: 16
};

export const title = {
  ...common,
  fontWeight: 'lighter',
  fontSize: 12
};

export const subheader = {
  ...common,
  fontWeight: 'bold',
  fontSize: 14
};

export const subheader2 = {
  ...common,
  fontWeight: 'bold',
  fontSize: 10
};

// Paragraphs

export const largeBody = {
  ...common,
  fontWeight: 'bold',
  fontSize: 11
};

export const body = {
  ...common,
  fontWeight: 'lighter',
  fontSize: 10
};

export const smallBody = {
  ...common,
  fontWeight: 'lighter',
  fontSize: 6
};

// Numbers

export const number = {
  ...common,
  fontWeight: 'normal',
  fontSize: 14
};

export const largeNumber = {
  ...common,
  fontWeight: 'normal',
  fontSize: 30
};

// Buttons

export const button = {
  ...common,
  fontWeight: 'normal',
  fontSize: 10
};
