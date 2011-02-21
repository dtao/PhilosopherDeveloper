using System;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

using PostSharp.Aspects;
using PostSharp.Reflection;

namespace PostSharpExample
{
    [Serializable]
    class NotifyPropertyChangedAttribute : LocationInterceptionAspect
    {
        private Func<object, PropertyChangedEventHandler> _getHandler;

        public override bool CompileTimeValidate(LocationInfo locationInfo)
        {
            Type requiredType = typeof(INotifyPropertyChanged);

            PropertyInfo property = locationInfo.PropertyInfo;
            if (property == null || !requiredType.IsAssignableFrom(property.DeclaringType))
            {
                throw new Exception(string.Format("The {0} aspect can only be applied to properties of types implementing {1}.", GetType().Name, requiredType.Name));
            }

            return base.CompileTimeValidate(locationInfo);
        }

        public override void OnSetValue(LocationInterceptionArgs args)
        {
            if (_getHandler == null)
            {
                _getHandler = GetHandlerFirstTime(args.Location);
            }

            PropertyChangedEventHandler handler = _getHandler(args.Instance);
            if (handler != null)
            {
                handler(args.Instance, new PropertyChangedEventArgs(args.LocationName));
            }

            base.OnSetValue(args);
        }

        private Func<object, PropertyChangedEventHandler> GetHandlerFirstTime(LocationInfo locationInfo)
        {
            Type fieldType = typeof(PropertyChangedEventHandler);

            var fields = from f in locationInfo.DeclaringType.GetFields(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic)
                         where f.FieldType == fieldType
                         select f;

            FieldInfo propertyChangedField = null;
            try
            {
                propertyChangedField = fields.Single();
            }
            catch (InvalidOperationException)
            {
                throw new Exception(string.Format("The {0} aspect is only compatible with the simple scenario of a single {1} field.", GetType().Name, fieldType.Name));
            }

            // (object x) => (([Type])x).[Field]
            ParameterExpression obj = Expression.Parameter(typeof(object));
            UnaryExpression convertObj = Expression.Convert(obj, locationInfo.DeclaringType);
            MemberExpression getField = Expression.PropertyOrField(convertObj, propertyChangedField.Name);

            Expression<Func<object, PropertyChangedEventHandler>> expression = Expression.Lambda<Func<object, PropertyChangedEventHandler>>(getField, obj);

            return expression.Compile();
        }
    }
}
