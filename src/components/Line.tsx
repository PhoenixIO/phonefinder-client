export function Line({ styles }: any) {
  return (
    <hr style={{
      color: '#9b9b9b',
      backgroundColor: '#9b9b9b',
      width: '100%',
      height: 3,
      ...styles,
    }}/>
  );
};
