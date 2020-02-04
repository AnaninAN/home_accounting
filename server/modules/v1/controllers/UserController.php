<?php

namespace app\modules\v1\controllers;

use Yii;
use yii\filters\Cors;
use app\modules\v1\models\User;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class UserController extends ActiveController
{
    public $modelClass = User::class;

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
                    'class' => \yii\filters\Cors::className(),
                    'cors' => [
                        'Origin' => ['http://localhost:8080'],
                        'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'OPTIONS'],
                        'Access-Control-Allow-Credentials' => true,
                    ],

                ];
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
            'except' => ['sign-up', 'auth'],
        ];

        return $behaviors;
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        if ($action === 'index') {
            if(empty(Yii::$app->authManager->getRolesByUser(Yii::$app->user->id)['admin'])) {
                throw new \yii\web\ForbiddenHttpException('Only Administrator can do this');
            }
        }

        if ($action === 'view' | $action === 'update') {
            if(empty(Yii::$app->authManager->getRolesByUser(Yii::$app->user->id)['admin'])) {
                if($model->id !== \Yii::$app->user->id) {
                    throw new \yii\web\ForbiddenHttpException(sprintf('You can only %s your user information.', $action));
                }
            }
        }
    }

    public function actions() {

        $actions = parent::actions();
        unset($actions['create'], $actions['delete']);

        return $actions;
    }

    public function actionSignUp()
    {
            $user = new User();
            $user->username = Yii::$app->request->post('username');
            $user->email = Yii::$app->request->post('email');
            $user->setPassword(Yii::$app->request->post('password'));
            $user->generateAuthKey();
            $user->generateEmailVerificationToken();
            if ($user->save()) {
                $role = Yii::$app->authManager->getRole('simple');
                Yii::$app->authManager->assign($role, (string) $user->id);
                return $user->getAuthKey();
            } else {
                echo json_encode($user->errors);
            }
    }

    public function actionAuth()
    {
        $user = User::find()->where(['username' => Yii::$app->request->post('username')])->one();
        if (empty($user)) {
            throw new \yii\web\ForbiddenHttpException('Wrong credentials');
        } else {
            if ($user->validatePassword(Yii::$app->request->post('password'))) {
                return $user->getAuthKey();
            } else {
                throw new \yii\web\ForbiddenHttpException('Wrong credentials');
            }
        }
    }
}
