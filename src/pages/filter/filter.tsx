import Tabs from 'component/tabs/tabs'
import React, { useCallback, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BiSearch } from 'react-icons/bi'
import './filter.css'

interface TabProps {
  tabKey: string;
}

interface Option {
  value: string;
  label: string;
}

const CustomListView: React.FC<TabProps> = (props) => {

  const [options, setOptions] = useState<Option[]>([
    { value: 'option1', label: '1' },
    { value: 'option2', label: '2' },
  ]);

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [onchangeValue, setOnchangeValue] = useState('');

  const handleSelectOption = (option: Option) => {
    setSelectedOptions([...selectedOptions, option]);
    setSearchTerm('');
    setDropdownOpen(false);
  };

  const handleRemoveOption = (option: Option) => {
    const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption.value !== option.value);
    setSelectedOptions(updatedOptions);
  };

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) 
      && option.label.toLowerCase().includes(onchangeValue.toLowerCase())
      &&
      !selectedOptions.some((selectedOption) => selectedOption.value === option.value)
  );
  

  const codeReactjs = `
    const [options, setOptions] = useState<Option[]>([
      { value: 'option1', label: '1' },
      { value: 'option2', label: '2' },
    ]);

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [onchangeValue, setOnchangeValue] = useState('');

    const handleSelectOption = (option: Option) => {
      setSelectedOptions([...selectedOptions, option]);
      setSearchTerm('');
      setDropdownOpen(false);
    };

    const handleRemoveOption = (option: Option) => {
      const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption.value !== option.value);
      setSelectedOptions(updatedOptions);
    };

    const filteredOptions = options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) 
        && option.label.toLowerCase().includes(onchangeValue.toLowerCase())
        &&
        !selectedOptions.some((selectedOption) => selectedOption.value === option.value)
    );
  `;

  const codeJS = `
      //HTML
      <div class="container-custom">
        <div class="select-filter">
            <div class="frame-input">
                //Icon here
                <div id="selectedOptions" class="filter-input"></div>
                <input type="text" id="searchInput" class="filter-input" placeholder="Please select" />
            </div>
            <div id="dropdown" class="multi-select"></div>
        </div>
      </div>
  
      //JS
      // Định nghĩa mảng tùy chọn
      const options = [
        { value: 'option1', label: '1' },
        { value: 'option2', label: '2' },
      ];

      // Khởi tạo các trạng thái
      let selectedOptions = [];
      let searchTerm = '';
      let onchangeValue = '';
      let dropdownOpen = false;

      // Lấy các phần tử DOM cần thao tác
      const searchInput = document.getElementById('searchInput');
      const selectedOptionsContainer = document.getElementById('selectedOptions');
      const dropdownContainer = document.getElementById('dropdown');

      // Hàm để hiển thị danh sách tùy chọn
      function renderOptions() {
        dropdownContainer.innerHTML = '';
        const filteredOptions = options.filter(
          (option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
            option.label.toLowerCase().includes(onchangeValue.toLowerCase()) &&
            !selectedOptions.some((selectedOption) => selectedOption.value === option.value)
        );
        filteredOptions.forEach((option) => {
          const optionElement = document.createElement('div');
          optionElement.className = 'select-option';
          optionElement.innerText = option.label;
          optionElement.addEventListener('click', () => handleSelectOption(option));
          dropdownContainer.appendChild(optionElement);
        });
      }

      // Hàm để cập nhật giao diện các tùy chọn đã chọn
      function renderSelectedOptions() {
        selectedOptionsContainer.innerHTML = '';
        selectedOptions.forEach((option) => {
          const optionElement = document.createElement('div');
          optionElement.className = 'filter-item';
          optionElement.innerText = option.label;
          optionElement.addEventListener('click', () => handleRemoveOption(option));

          const removeButton = document.createElement('span');
          removeButton.className = 'remove-filter';
          removeButton.innerText = 'X';
          removeButton.addEventListener('click', () => handleRemoveOption(option));

          optionElement.appendChild(removeButton);
          selectedOptionsContainer.appendChild(optionElement);
        });
        selectedOptionsContainer.style.display = selectedOptions.length === 0 ? 'none' : '';
      }

      // Hàm xử lý khi chọn một tùy chọn
      function handleSelectOption(option) {
          selectedOptions.push(option);
          searchTerm = '';
          dropdownOpen = false;
          renderSelectedOptions();
          renderOptions();
      }

      // Hàm xử lý khi xóa một tùy chọn
      function handleRemoveOption(option) {
          selectedOptions = selectedOptions.filter((selectedOption) => selectedOption.value !== option.value);
          renderSelectedOptions();
          renderOptions();
      }

      // Xử lý sự kiện khi nhập liệu vào ô tìm kiếm
      searchInput.addEventListener('input', (event) => {
          searchTerm = event.target.value;
          renderOptions();
      });

      // Xử lý sự kiện khi nhập liệu vào ô nhập liệu (click hiện option)
      searchInput.addEventListener('click', () => {
          dropdownOpen = !dropdownOpen;
          renderOptions();
      });

      renderSelectedOptions();
    
    `;

  return (
    <div className='container-custom'>
      <div className='select-filter'>
        <h3>Multiple selection</h3>
        <div className='frame-input'>
          <BiSearch className='icon-search-header' />
          <div className='filter-input' style={{ display: selectedOptions.length === 0 ? 'none' : '' }} onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selectedOptions.map((option) => <div className='filter-item'>
              {option.label}
              <span className='remove-filter' onClick={() => handleRemoveOption(option)}>X</span>
            </div>)}
          </div>
          <input
            type="text"
            value={onchangeValue}
            onChange={(event) => setOnchangeValue(event.target.value)}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className='filter-input'
            placeholder='Please select'
          />
        </div>
        {dropdownOpen && (
          <div className='multi-select'>
            {filteredOptions.map((option) => (
              <div className='select-option' key={option.value} onClick={() => handleSelectOption(option)}>
                {option.label}
              </div>
            ))} 
          </div>
        )}
      </div>
      <div className='source-code'>
        <h3>Code</h3>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {props.tabKey === 'JS'
            ?
            codeJS
            :
            codeReactjs
          }
        </SyntaxHighlighter>

      </div>
    </div>
  );
}
function Filter() {
  const Item = useCallback((props: TabProps) => {
    return <CustomListView {...props} />;
  }, []);
  return (
    <Tabs RowList={Item} />
  )
}

export default Filter