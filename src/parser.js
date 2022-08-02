import yaml from 'js-yaml';

const parser = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unsupported format - ${format}`);
  }
};

export default parser;
