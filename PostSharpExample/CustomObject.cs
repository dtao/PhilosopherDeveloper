using System;
using System.ComponentModel;

namespace PostSharpExample
{
    class CustomObject : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        [NotifyPropertyChanged]
        public string StringProperty { get; set; }

        [NotifyPropertyChanged]
        public bool BooleanProperty { get; set; }

        [NotifyPropertyChanged]
        public int IntegerProperty { get; set; }

        [NotifyPropertyChanged]
        public double DoubleProperty { get; set; }

        [NotifyPropertyChanged]
        public DateTime DateTimeProperty { get; set; }
    }
}
