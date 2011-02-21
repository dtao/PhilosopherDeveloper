using System;
using System.ComponentModel;
using System.Windows.Forms;

namespace PostSharpExample
{
    public partial class PostSharpExampleForm : Form
    {
        private readonly CustomObject _customObject = new CustomObject();

        public PostSharpExampleForm()
        {
            InitializeComponent();

            _customObject.PropertyChanged += CustomObjectPropertyChanged;
            _propertyGrid.SelectedObject = _customObject;
        }

        void CustomObjectPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            _textBox.AppendText(string.Format("Property {0} changed.{1}", e.PropertyName, Environment.NewLine));
        }
    }
}
