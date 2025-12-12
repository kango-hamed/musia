import { useState } from 'react';
import { useAuth } from '../services/authServices';
import { useForm } from '../hook/authHook';


export const LoginPage = () => {
  const { login } = useAuth();
  const { values, errors, setErrors, handleChange, resetForm } = useForm({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!values.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!values.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (values.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setAlert(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(values.email, values.password);
      setAlert({ type: 'success', message: 'Connexion réussie!' });
      resetForm();
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Connexion</h1>
          <p className="text-gray-600 mt-2">Bienvenue! Connectez-vous à votre compte</p>
        </div>

        {alert && (
          <Alert 
            type={alert.type} 
            message={alert.message} 
            onClose={() => setAlert(null)} 
          />
        )}

        <div>
          <Input
            label="Adresse email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="exemple@email.com"
          />

          <Input
            label="Mot de passe"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
          />

          <div className="mb-6">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Mot de passe oublié?
            </a>
          </div>

          <Button onClick={handleSubmit} loading={loading}>
            Se connecter
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Identifiants de test:</p>
          <p className="font-mono text-xs mt-1">user@example.com / password123</p>
        </div>
      </div>
    </div>
  );
};