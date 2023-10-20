import xml.etree.ElementTree as et
import csv

source_file = '_no_commit/omst02.xml'


def section_labels(struct_tag):
    tag_name = struct_tag[0:-5]
    table_name = 'acm_' + tag_name.lower()
    return {'tag_name': tag_name, 'table_name': table_name}


def parse_xml(xml_file):
    tree = et.parse(xml_file)
    root = tree.getroot()

    sections = {}
    for section in root:
        section_label = section_labels(section.tag)
        sections[section_label['table_name']] = process_section(section)

    print(sections)
    return sections


def process_section(xml_section):
    data = []
    header = []
    records = 0

    section_label = section_labels(xml_section.tag)

    if section_label['tag_name'] != 'CONFIG':
        items = xml_section.findall(section_label['tag_name'])

        if len(items) > 0:
            g_set = ''
            p_set = ''
            e_set = ''
            for record in items[0]:
                if section_label['tag_name'] == 'EQUATION' and record.tag == 'ELEMENT':
                    pass
                elif section_label['tag_name'] == 'GROUP' and record.tag == 'PARAM_ID':
                    if g_set == '':
                        g_set = record.tag
                elif section_label['tag_name'] == 'TREND' and record.tag == 'GROUP_ID':
                    if p_set == '':
                        p_set = record.tag
                elif section_label['tag_name'] == 'EXCEEDANCE' and record.tag == 'GROUP_ID':
                    if p_set == '':
                        p_set = record.tag
                elif section_label['tag_name'] == 'DF' and record.tag == 'ENUM_ID':
                    if e_set == '':
                        e_set = record.tag
                else:
                    header.append(record.tag)

            if g_set != '':
                header.append(g_set)
            if p_set != '':
                header.append(p_set)

            for item in items:
                line = []
                v_set = []
                for record in item:
                    if section_label['tag_name'] == 'EQUATION' and record.tag == 'ELEMENT':
                        pass
                    elif section_label['tag_name'] == 'GROUP' and record.tag == 'PARAM_ID':
                        v_set.append(record.text)
                    elif section_label['tag_name'] == 'TREND' and record.tag == 'GROUP_ID':
                        v_set.append(record.text)
                    elif section_label['tag_name'] == 'EXCEEDANCE' and record.tag == 'GROUP_ID':
                        v_set.append(record.text)
                    elif section_label['tag_name'] == 'DF' and record.tag == 'ENUM_ID':
                        v_set.append(record.text)
                    else:
                        line.append(record.text)

                if len(v_set) != 0:
                    separator = ','
                    line.append(separator.join(v_set))

                data.append(line)

        with open('_no_commit/' + section_label['table_name'] + '.csv', 'w') as ff:
            cols = header
            node_writer = csv.writer(ff)
            node_writer.writerow(cols)
            for node in data:
                values = node
                node_writer.writerow(values)

    return {'header': header, 'data': data, 'records': records}


parse_xml(source_file)
