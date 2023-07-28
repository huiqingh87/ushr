import sys
from PySide2.QtWidgets import QApplication, QMainWindow,QAction, QDialog, QWidget, QFormLayout, QLabel,QCheckBox, QFileDialog, QLineEdit, QPushButton, QVBoxLayout, QHBoxLayout, QToolButton, QMessageBox, QListWidget,QListWidgetItem,QDialogButtonBox, QAbstractItemView
from PySide2.QtCore import QSize,  Qt
from PySide2.QtGui import QIcon
from resources import *
import geopandas as gpd
import os, time
import webbrowser

current_script_path = os.path.abspath(__file__)
current_folder = os.path.dirname(current_script_path)


def open_excel_file(file_path):
    try:
        os.startfile(file_path)
    except Exception as e:
        print(f"Error occurred: {e}")

class ColumnSelectDialog(QDialog):
    def __init__(self, keys, parent=None):
        super().__init__(parent)
        self.selected_keys = []
        layout = QVBoxLayout()
        # Create a QListWidget with checkable items
        self.list_widget = QListWidget(self)
        self.list_widget.setSelectionMode(QAbstractItemView.MultiSelection) 
        self.list_widget.itemClicked.connect(self.update_check_state)
        for key in keys:
            #item = self.list_widget.addItem(key)
            item = QListWidgetItem(key)
            if not item:
                continue
            item.setFlags(item.flags() | Qt.ItemIsUserCheckable)
            #print(key)
            if key.lower().find('id')!=-1 or key.lower().find('region')!=-1 or key.lower().find('segment')!=-1 or key.lower().find('overall')!=-1 or key.lower().find('centroid_str')!=-1:
                item.setCheckState(Qt.Checked)
                item.setSelected(True)
            else:
                item.setCheckState(Qt.Unchecked)
                item.setSelected(False)
            self.list_widget.addItem(item)
        layout.addWidget(self.list_widget)
        # Create a QDialogButtonBox with OK and Cancel buttons
        button_box = QDialogButtonBox(QDialogButtonBox.Ok | QDialogButtonBox.Cancel)
        button_box.accepted.connect(self.accept)
        button_box.rejected.connect(self.reject)
        layout.addWidget(button_box)
        self.setLayout(layout)
    def update_check_state(self, item):
        if item.checkState() == Qt.Unchecked:
            item.setCheckState(Qt.Checked)
        else:
            item.setCheckState(Qt.Unchecked)
    def selectedColumns(self):
        # for i in range(self.list_widget.count()):
        #     item = self.list_widget.item(i)
        #     if item.checkState() == Qt.Checked:
        #         self.selected_keys.append(item.text())
        # return self.selected_keys
        selected_items = self.list_widget.selectedItems()
        self.selected_keys = [item.text() for item in selected_items] # if item.checkState() == Qt.Checked]
        return self.selected_keys
    def get_checked_items(self):
        self.selected_keys = []
        for index in range(self.list_widget.count()):
            item = self.list_widget.item(index)
            if item.checkState() == Qt.Checked:
                self.selected_keys.append(item.text())
        
        return self.selected_keys


class CentroidTool(QMainWindow):
    def __init__(self):
        super().__init__()

        # Set the window title
        self.setWindowTitle("Centroids Grabber")
        # Set the application icon
        icon = QIcon(QIcon(':/plugin/happy_ansi/search'))  # Replace "path_to_icon_file.png" with the actual path to your icon file
        self.setWindowIcon(icon)

       # Create an About menu button
        self.about_action = QAction("About", self)
        self.about_action.triggered.connect(self.show_about_dialog)

        self.menuBar().addAction(self.about_action)

       # Create an About menu button
        self.select_field_action = QAction("Fields", self)
        self.select_field_action.triggered.connect(self.show_column_select_dialog)
        self.select_field_action.setEnabled(False)
        self.menuBar().addAction(self.select_field_action)

        # Set the fixed window size
        self.setFixedSize(460, 140)

        # Create a central widget and layout
        central_widget = QWidget(self)
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout()

 
        shape_layout = QHBoxLayout()
        self.shapeLabel = QLabel('Select Shapefile')
        self.shapeLabel.setFixedWidth(80)
        self.shapeEdit = QLineEdit()
        self.shapeEdit.setFixedWidth(320)
        self.shapeBtn = QToolButton()
        self.shapeBtn.setFixedSize(QSize(20,20))
        self.shapeBtn.setIcon(QIcon(':/plugin/happy_ansi/open'))
        self.shapeBtn.setIconSize(QSize(16,16))
        self.shapeBtn.setStyleSheet("border:1")
        self.shapeBtn.setToolTip("Load Finished shape's Data File")        
        for s in (self.shapeLabel, self.shapeEdit,self.shapeBtn):
            shape_layout.addWidget(s)


        output_layout = QHBoxLayout()
        self.outputLabel = QLabel('Output Result')
        self.outputLabel.setFixedWidth(80)
        self.outputEdit = QLineEdit()
        self.outputEdit.setFixedWidth(320)
        self.outputBtn = QToolButton()
        self.outputBtn.setFixedSize(QSize(20,20))
        self.outputBtn.setIcon(QIcon(':/plugin/happy_ansi/open'))
        self.outputBtn.setIconSize(QSize(16,16))
        self.outputBtn.setStyleSheet("border:1")
        self.outputBtn.setToolTip("Load output Data File")        
        for s in (self.outputLabel, self.outputEdit,self.outputBtn):
            output_layout.addWidget(s)

        # Row 3 with Save and Close buttons
        button_layout = QHBoxLayout()
        # Create the "Open After" checkbox
        self.open_after_checkbox = QCheckBox("Open After")
        self.open_after_checkbox.setChecked(True)
        self.open_after_checkbox.setFixedWidth(120)
        button_layout.addWidget(self.open_after_checkbox)
        self.save_button = QPushButton("Save")
        self.close_button = QPushButton("Close")
        for s in (self.save_button, self.close_button):
            s.setFixedWidth(80)
            button_layout.addWidget(s)

        for l in (shape_layout,output_layout,button_layout):
            main_layout.addLayout(l)

        # Set the layout to the central widget
        central_widget.setLayout(main_layout)

        self.ws         = None
        self.data_uri   = None
        self.data       = None   
        self.output_fn  = None
        self.start_time = None
        self.end_time   = None
        self.csDialog   = None
        self.selected_keys = []
        self.open_after = True  
        self.shapeBtn.clicked.connect(self.load_data)
        self.outputBtn.clicked.connect(self.set_csv_path)
        self.save_button.clicked.connect(self.save_data)
        self.close_button.clicked.connect(self.close_app)
        # Connect the "Open After" checkbox state change signal to a slot
        self.open_after_checkbox.stateChanged.connect(self.open_after_changed)
    def open_after_changed(self):
        if self.open_after_checkbox.isChecked():
            self.open_after = True  
        else:
            self.open_after = False
    def close_app(self):
        QApplication.quit()
    def show_about_dialog(self):
        QMessageBox.about(self, "About", "Author: Huiqing Huang\nThis tool calculates the centroid from a shapefile.")

    def show_column_select_dialog(self):
        # Get the keys (column names) of the DataFrame
        keys = self.data.columns.tolist()
        # Create the child window and get the selected keys
        dialog = ColumnSelectDialog(keys, self)
        dialog.setWindowTitle("Select Fields")
        if dialog.exec_() == QDialog.Accepted:
            print("Selected Keys0:", self.selected_keys)
            self.selected_keys = dialog.get_checked_items()
            print("Selected Keys1:", self.selected_keys)

    def load_data(self):
        if not self.ws:
            self.ws  = current_folder
        self.data_uri  = QFileDialog.getOpenFileName(None,'Load Spatial Data', self.ws, 'Shapefiles (*.shp);;GeoJSON (*.geojson);;Excel Files (*.xlsx);;Text Files (*.txt);;CSV(*.csv);;All Files(*)')[0]
        if not self.data_uri:
            QMessageBox.about(self,'Something Goes Wrong Here','No File Has Been Selected!')
            return 
        self.shapeEdit.setText(self.data_uri)
        self.start_time = time.time()
        self.data    = gpd.read_file(self.data_uri)
        if "evaluate" in self.data.keys():
            self.data = self.data[self.data.evaluate == 'T']
        self.data['centroid_str'] = self.data.geometry.apply(lambda g: "%s,%s" % (g.centroid.x, g.centroid.y))
        self.show_column_select_dialog()
        self.select_field_action.setEnabled(True)
        if len(self.data)==0:
            QMessageBox.about(self,'ERROR','No Samples In the Dataset!')
            return 

    def set_csv_path(self):
        options = QFileDialog.Options()
        file_name, _ = QFileDialog.getSaveFileName(self, "Save File", "", "Text Files (*.csv);;All Files (*)", options=options)
        if file_name:
            self.output_fn = file_name
            self.outputEdit.setText(self.output_fn)
    def save_data(self):  
        try:
            if "centroid_str" not in self.selected_keys:
                self.selected_keys  += ['centroid_str']
            self.data[self.selected_keys].to_csv(self.output_fn, index=False)
            self.end_time = time.time()
            running_time = self.end_time - self.start_time
            message = "New CSV file with centroid coordinates is saved!\nElapsed time:  %.2f seconds"%running_time
            QMessageBox.information(self, "Elapsed Time", message)
            webbrowser.open(os.path.dirname(os.path.realpath(self.output_fn)))
            if self.open_after:
                open_excel_file(self.output_fn)
        except:
            print("ERROR OCCURRED")
    def save_centroid(self):
        # Start measuring the execution time
        start_time = time.time()

        df = gpd.read_file(fn)
        df = df[df.evaluate == 'T']
        df['centroid_str'] = df.geometry.apply(lambda g: "%s,%s" % (g.centroid.x, g.centroid.y))

        cols = []
        for c in df.keys():
            if c.lower().find('id')!=-1 or c.lower().find('region')!=-1 or c.lower().find('segment')!=-1 or c.lower().find('overall')!=-1 or c.lower().find('centroid_str')!=-1:
                cols.append(c)

        try:
            df[cols].to_csv(fn.replace(".shp", ".csv"), index=False)
            print("New CSV file with centroid coordinates is saved")
        except:
            print("ERROR OCCURRED")

        # Calculate and print the running time
        end_time = time.time()
        running_time = end_time - start_time
        print("Running time: %.2f seconds" % running_time)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = CentroidTool()
    window.show()
    sys.exit(app.exec_())
