<?php

namespace App\Controller\API\Library;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Document\Album;

class AlbumController extends AbstractController
{
    /**
     * @Route("/api/library/albums", methods={"GET"})
     */
    public function getAll(DocumentManager $dm)
    {
        $albums = $dm->getRepository(Album::class)->findAll();
        
        $json = array();
        foreach ($albums as $album)
            $json[] = $album->getProperties();

        return new JsonResponse($json);
    }
}
