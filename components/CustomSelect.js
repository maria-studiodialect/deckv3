import Select from 'react-select'

const customStyles = {
  control: () => ({
    // none of react-select's styles are passed to <Control />
    border: '1px solid #2F2727',
    display: 'flex',
    width: '100%',
    boxShadow: 'none',
    color: '#2F2727',
  }),
  singleValue: (base) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    opacity: 0,
    height: 0
  }),
  valueContainer: (base) => ({
    ...base,
    alignItems: 'center',
  }),
};

const CustomOption = (props) => {
  const { innerProps, innerRef, data } = props;
  return (
    <div ref={innerRef} {...innerProps} className='flex cursor-pointer hover:bg-beige px-2 py-1'>
      <div className={`w-5 h-5 rounded-full mr-2`} style={{ backgroundColor: data.color }}></div><div dangerouslySetInnerHTML={{ __html: data.label }} />
    </div>
  );
};

const CustomSingleValue = (props) => {
  const { innerProps, innerRef, data } = props;
  return (
    <div ref={innerRef} {...innerProps} className='flex items-center'>
      <div className={`w-5 h-5 rounded-full`} style={{ backgroundColor: data.color }}></div>
      <div
        dangerouslySetInnerHTML={{ __html: data.label }}
        className='px-2 py-1'
      />
    </div>
  );
};

const NullIndicatorSeparator = () => null;


const CustomSelect = ({ opt, ph, change }) => (
  <Select
    options={opt}
    placeholder={ph}
    styles={customStyles}
    className='mt-5 md:mt-5 w-full text-xs'
    maxMenuHeight={150}
    components={{
      Option: CustomOption,
      SingleValue: CustomSingleValue, 
      IndicatorSeparator: NullIndicatorSeparator,
    }}
    theme={(theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary25: '#F5F5F5',
        primary: 'rgb(146 146 146)',
        primary50: 'rgb(146 146 146)',
      },
    })}
    onChange={change}
  />
)

export default CustomSelect
